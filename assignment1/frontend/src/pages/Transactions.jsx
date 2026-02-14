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
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Transaction Explorer
              </h2>

              <div className="flex gap-3">
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  className="w-64"
                />

                <Button
                  onClick={() => {
                    setEditData(null);
                    setIsModalOpen(true);
                  }}
                >
                  + Add
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-5 gap-3">
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

        <CardContent>
          {loading && (
            <p className="text-sm text-slate-500">
              Loading transactions...
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {!loading && transactions.length === 0 && (
            <p className="text-slate-500 text-sm">
              No transactions found.
            </p>
          )}

          {transactions.length > 0 && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t._id}>
                      <TableCell>{t.title}</TableCell>
                      <TableCell>₹ {t.amount}</TableCell>
                      <TableCell>{t.category}</TableCell>
                      <TableCell>
                        {new Date(t.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            className="text-xs"
                            onClick={() => {
                              setEditData(t);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            className="text-xs bg-red-500 hover:bg-red-600"
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

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  Prev
                </Button>

                <span className="flex items-center text-sm px-2">
                  Page {page} of {pages}
                </span>

                <Button
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
