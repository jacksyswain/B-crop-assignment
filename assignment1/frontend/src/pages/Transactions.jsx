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

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(
        `/transactions?page=${page}&search=${search}`
      );

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
  }, [page, search]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Transaction Explorer
          </h2>

          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-64"
          />
        </div>
      </CardHeader>

      <CardContent>

        {loading && (
          <p className="text-sm text-slate-500 mb-4">
            Loading transactions...
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {!loading && transactions.length === 0 && (
          <p className="text-slate-500 text-sm mb-4">
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
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
  );
}
