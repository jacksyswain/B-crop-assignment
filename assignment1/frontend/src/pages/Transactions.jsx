import { useEffect, useState } from "react";
import API from "../services/api";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../components/ui/Table";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams({
        page,
        search,
        ...filters,
      }).toString();

      const res = await API.get(`/transactions?${query}`);

      setTransactions(res.data.data.transactions);
      setPages(res.data.data.pages);
    } catch (err) {
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, filters]);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await API.delete(`/transactions/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
  <>
    <Card className="bg-white shadow-sm rounded-2xl border border-slate-200">
      <CardHeader className="border-b bg-slate-50 rounded-t-2xl">
        <div className="flex flex-col gap-6">

          {/* Top Row */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Transaction Explorer
              </h2>
              <p className="text-sm text-slate-500">
                Manage and filter your transactions
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-72 bg-white"
              />

              <Button
                className="bg-slate-900 hover:bg-slate-800"
                onClick={() => {
                  setEditData(null);
                  setIsModalOpen(true);
                }}
              >
                + Add Transaction
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-5 gap-4">
            <Input
              placeholder="Category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Min Amount"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Max Amount"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
              }
            />

            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />

            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>

        </div>
      </CardHeader>

      <CardContent className="p-6">

        {loading && (
          <div className="text-center py-10 text-slate-500">
            Loading transactions...
          </div>
        )}

        {error && (
          <div className="text-center py-6 text-red-500">
            {error}
          </div>
        )}

        {!loading && transactions.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No transactions found.
          </div>
        )}

        {transactions.length > 0 && (
          <>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <Table>
                <TableHead>
                  <TableRow className="bg-slate-50 text-slate-600 text-sm">
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell className="font-medium">Amount</TableCell>
                    <TableCell className="font-medium">Category</TableCell>
                    <TableCell className="font-medium">Date</TableCell>
                    <TableCell className="font-medium text-right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions.map((t) => (
                    <TableRow
                      key={t._id}
                      className="hover:bg-slate-50 transition"
                    >
                      <TableCell className="font-medium text-slate-800">
                        {t.title}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        ₹ {t.amount}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {t.category}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(t.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                            onClick={() => {
                              setEditData(t);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            className="text-xs bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleDelete(t._id)}
                            disabled={deletingId === t._id}
                          >
                            {deletingId === t._id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-3 mt-6">
              <Button
                className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
              >
                Prev
              </Button>

              <span className="text-sm text-slate-600">
                Page {page} of {pages}
              </span>

              <Button
                className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === pages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>

    <TransactionModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      editData={editData}
      onSuccess={fetchData}
    />
  </>
);

}
