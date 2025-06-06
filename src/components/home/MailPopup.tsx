"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowRight } from "lucide-react";

export interface MailPopupRef {
  triggerPopup: (email: string) => void;
}

export const MailPopup = forwardRef<MailPopupRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useImperativeHandle(ref, () => ({
    triggerPopup: (email: string) => {
      setUserEmail(email);
      setIsOpen(true);
    },
  }));

  const handleSubmit = async () => {
    const response = await fetch("/api/newsletter", {
      method: "GET",
    });

    const responseData = await response.json();
    setResponseMessage(responseData.reason);
    setIsOpen(false);
    setIsResponseOpen(true);
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <ArrowRight
            strokeWidth={1.5}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 hover:text-btn-primary transition-colors"
            data-mail-popup-trigger
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Subscribe to our newsletter</AlertDialogTitle>
            <AlertDialogDescription>
              Subscribe to our newsletter to get the latest news and updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Subscribe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isResponseOpen} onOpenChange={setIsResponseOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Subscription Status</AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-line">
              Sorry, there&apos;s no mail for {userEmail}.{"\n\n"}
              {responseMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsResponseOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

MailPopup.displayName = "MailPopup";
