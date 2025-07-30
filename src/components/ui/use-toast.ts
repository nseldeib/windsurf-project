import * as React from "react"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToastAction = "add" | "update" | "dismiss"

type Toast = Omit<ToastProps, "onOpenChange"> & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "add" as const,
  UPDATE_TOAST: "update" as const,
  DISMISS_TOAST: "dismiss" as const,
  DISMISS_TOASTS: "dismiss_toasts" as const,
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Action = {
  type: typeof actionTypes.ADD_TOAST
  toast: Toast
} | {
  type: typeof actionTypes.UPDATE_TOAST
  toast: Partial<Toast>
} | {
  type: typeof actionTypes.DISMISS_TOAST
  toastId?: Toast["id"]
} | {
  type: typeof actionTypes.DISMISS_TOASTS
}

interface State {
  toasts: Toast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "dismiss_toast",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add": {
      const { toast } = action

      return {
        ...state,
        toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    }

    case "update": {
      const { toast } = action
      const { toasts } = state

      return {
        ...state,
        toasts: toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)),
      }
    }

    case "dismiss": {
      const { toastId = genId() } = action
      const { toasts } = state

      // ! Side effects ! - This could be extracted into a dismissToast function if you want to avoid them
      if (toastTimeouts.has(toastId)) {
        clearTimeout(toastTimeouts.get(toastId))
      }

      return {
        ...state,
        toasts: toasts.filter((t) => t.id !== toastId),
      }
    }

    case "dismiss_toasts": {
      toasts.forEach((toast) => {
        if (toastTimeouts.has(toast.id)) {
          clearTimeout(toastTimeouts.get(toast.id))
        }
      })

      return {
        ...state,
        toasts: [],
      }
    }
  }
}

const listeners: Array<(state: State) => void> = []

let memory: State = { toasts: [] }

function dispatch(action: Action) {
  memory = reducer(memory, action)
  listeners.forEach((listener) => {
    listener(memory)
  })
}

type ToastDispatch = typeof dispatch

function toast({
  title,
  description,
  action,
  ...props
}: Omit<Toast, "id">) {
  const id = genId()

  const update = (props: Partial<Omit<Toast, "id">>) =>
    dispatch({
      type: "update",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "dismiss", toastId: id })

  dispatch({
    type: "add",
    toast: {
      id,
      title,
      description,
      action,
      ...props,
    },
  })

  return {
    id: id,
    update,
    dismiss,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memory)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "dismiss", toastId }),
  }
}

export { useToast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose }
