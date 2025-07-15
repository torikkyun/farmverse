import { useState } from "react";

export function useAddFarmForm(initial = {
  name: "",
  description: "",
  location: "",
  size: "",
  images: "",
}) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const reset = () => {
    setForm(initial);
    setError(null);
    setSuccess(null);
    setOpen(false);
  };

  return { form, setForm, error, setError, success, setSuccess, open, setOpen, reset };
}

export function useEditFarmForm(initial = {
  name: "",
  description: "",
  location: "",
  size: "",
  images: "",
}) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reset = () => {
    setForm(initial);
    setError(null);
    setSuccess(null);
  };

  return { form, setForm, error, setError, success, setSuccess, reset };
}