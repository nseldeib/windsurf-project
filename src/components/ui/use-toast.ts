import * as React from "react"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToastProps = {
  variant?: "default" | "destructive"
  onOpenChange?: (open: boolean) => void
  open?: boolean
  onDismiss?: () => void
}

type ToastAction = "add" | "update" | "dismiss"

type Toast = Omit<ToastProps, "onOpenChange"> & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Action = {
  type: "add"
  toast: Toast
} | {
  type: "update"
  toast: Partial<Toast>
} | {
  type: "dismiss"
  toastId?: Toast["id"]
} | {
  type: "dismiss_toasts"
}

interface State {
  toasts: Toast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "dismiss",
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
      state.toasts.forEach((toast) => {
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
