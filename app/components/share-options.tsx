"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Copy, Facebook, Send, MessageCircle } from "lucide-react";
import { generateFormattedText } from "../utils";

interface ShareOptionsProps {
  formData: any;
  boldFields: string[];
}

export function ShareOptions({ formData, boldFields }: ShareOptionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const formattedText = generateFormattedText(formData, boldFields);
    const shareUrl = `${window.location.origin}?share=${encodeURIComponent(
      btoa(JSON.stringify({ formData, boldFields }))
    )}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareOnWhatsApp = () => {
    const formattedText = generateFormattedText(formData, boldFields);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedText)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const shareUrl = `${window.location.origin}?share=${encodeURIComponent(
      btoa(JSON.stringify({ formData, boldFields }))
    )}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTelegram = () => {
    const formattedText = generateFormattedText(formData, boldFields);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.origin
    )}&text=${encodeURIComponent(formattedText)}`;
    window.open(telegramUrl, "_blank");
  };

  const sendDirectMessage = () => {
    if (!phoneNumber) return;

    const formattedText = generateFormattedText(formData, boldFields);
    const customMessage = message
      ? `${message}\n\n${formattedText}`
      : formattedText;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber.replace(
      /\D/g,
      ""
    )}&text=${encodeURIComponent(customMessage)}`;
    window.open(whatsappUrl, "_blank");
    setDialogOpen(false);
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={shareOnWhatsApp}>
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnFacebook}>
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnTelegram}>
            <Send className="h-4 w-4 mr-2" />
            Telegram
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy Link"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Send className="h-4 w-4 mr-2" />
            Send Direct
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send to WhatsApp</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number (with country code)</Label>
              <Input
                id="phone"
                placeholder="+91 1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Additional Message (optional)</Label>
              <Input
                id="message"
                placeholder="Optional message to include"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={sendDirectMessage}>Send</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
