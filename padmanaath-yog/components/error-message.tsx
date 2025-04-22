"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">Error</h3>
          <div className="mt-1">{message}</div>
          {retry && (
            <Button
              variant="outline"
              size="sm"
              onClick={retry}
              className="mt-2 border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
