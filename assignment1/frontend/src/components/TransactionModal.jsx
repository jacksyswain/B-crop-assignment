import { useState, useEffect } from "react";
import API from "../services/api";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { Card } from "./ui/Card";

export default function TransactionModal({
  isOpen,
  onClose,
  onSuccess,
  editData
}) {
  const isEdit = !!editData;

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        amount: editData.amount,
        category: editData.category,
        date: editData.date?.split("T")[0],
        notes: editData.notes || ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await API.put(`/transactions/${editData._id}`, form);
      } else {
        await API.post("/transactions", form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Transaction error", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <Input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <Input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <Input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <Input
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              className="bg-gray-300 text-black hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : isEdit
                ? "Update"
                : "Add"}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}
