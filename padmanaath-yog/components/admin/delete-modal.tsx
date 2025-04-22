"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
  onDelete: () => void
  isLoading: boolean
}

export default function DeleteModal({ isOpen, onClose, item, onDelete, isLoading }: DeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {item && (
            <div className="flex items-center space-x-3">
              {(item.image || item.src || item.thumbnail) && (
                <div className="h-12 w-12 flex-shrink-0">
                  <Image
                    src={
                      item.image ||
                      item.src ||
                      item.thumbnail ||
                      "/placeholder.svg?height=48&width=48" ||
                      "/placeholder.svg"
                    }
                    alt="Item to delete"
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium">{item.title || item.name}</p>
                <p className="text-sm text-gray-500">{item.excerpt || item.quote || item.description || ""}</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
