"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Inbox,
  Search,
  Mail,
  Phone,
  Building2,
  Stethoscope,
  Trash2,
  Eye,
  Loader2,
  Download,
  Calendar,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface LeadItem {
  _id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  countryCode: string;
  phoneNumber: string;
  practiceName: string;
  role: string;
  specialty: string;
  primaryService: string;
  challenges?: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  notes?: string;
  createdAt: string;
}

interface StatsData {
  total: number;
  new: number;
  contacted: number;
  closed: number;
}

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [stats, setStats] = useState<StatsData>({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();

      if (res.ok && data.leads) {
        setLeads(data.leads);
        if (data.stats) setStats(data.stats);
      } else {
        toast.error(data.error || "Failed to load inquiries");
      }
    } catch {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Status updated to "${newStatus}"`);
        setLeads((prev) =>
          prev.map((lead) => (lead._id === id ? { ...lead, status: newStatus as LeadItem["status"] } : lead))
        );
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as LeadItem["status"] } : null));
        }
        // Update stats locally
        fetchLeads();
      } else {
        toast.error(data.error || "Failed to update status");
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;

    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        toast.success("Lead inquiry deleted");
        setLeads((prev) => prev.filter((lead) => lead._id !== id));
        if (selectedLead?._id === id) setSelectedLead(null);
        fetchLeads();
      } else {
        toast.error(data.error || "Failed to delete lead");
      }
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    const headers = [
      "First Name",
      "Last Name",
      "Work Email",
      "Phone",
      "Practice Name",
      "Role",
      "Specialty",
      "Primary Service",
      "Status",
      "Challenges",
      "Submitted At",
    ];

    const rows = leads.map((l) => [
      `"${l.firstName}"`,
      `"${l.lastName}"`,
      `"${l.workEmail}"`,
      `"${l.countryCode} ${l.phoneNumber}"`,
      `"${l.practiceName}"`,
      `"${l.role}"`,
      `"${l.specialty}"`,
      `"${l.primaryService}"`,
      `"${l.status}"`,
      `"${(l.challenges || "").replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gosvizzera_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported to CSV!");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-brand dark:text-teal-400" />
            <span>Strategy Call & Contact Leads</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time inquiries received from website consultation and contact forms.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-brand dark:text-teal-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">New Inquiries</p>
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{stats.new}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Contacted</p>
          <p className="text-2xl font-bold text-amber-500">{stats.contacted}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Closed</p>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.closed}</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["all", "New", "Contacted", "In Progress", "Closed"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? "bg-brand dark:bg-teal-500 text-white dark:text-slate-950"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {st === "all" ? "All Inquiries" : st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, practice, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand dark:text-teal-400" />
            <p className="text-xs text-slate-400">Loading incoming inquiries...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Inbox className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No leads found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Any new strategy session or contact form submissions from the website will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200/80 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Practice & Role</th>
                  <th className="py-3.5 px-4">Specialty & Service</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Contact Person */}
                    <td className="py-4 px-4 min-w-[200px]">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <a href={`mailto:${lead.workEmail}`} className="hover:text-brand dark:hover:text-teal-300 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{lead.workEmail}</span>
                        </a>
                        {lead.phoneNumber && (
                          <a href={`tel:${lead.countryCode}${lead.phoneNumber}`} className="hover:text-brand dark:hover:text-teal-300 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{lead.countryCode} {lead.phoneNumber}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Practice & Role */}
                    <td className="py-4 px-4 min-w-[180px]">
                      <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{lead.practiceName}</span>
                      </p>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{lead.role}</span>
                    </td>

                    {/* Specialty & Primary Service */}
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                          <Stethoscope className="w-3 h-3 text-teal-500" />
                          <span>{lead.specialty}</span>
                        </span>
                        <p className="text-[11px] font-semibold text-brand dark:text-teal-300">
                          {lead.primaryService}
                        </p>
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead._id}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none transition-colors cursor-pointer ${
                          lead.status === "New"
                            ? "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800"
                            : lead.status === "Contacted"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                            : lead.status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800"
                            : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand hover:bg-slate-100 dark:text-slate-400 dark:hover:text-teal-300 dark:hover:bg-slate-800 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead._id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Details Modal Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Inquiry Details
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedLead.firstName} {selectedLead.lastName}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs font-sans">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80">
                <div>
                  <span className="text-slate-400 font-semibold">Email:</span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedLead.workEmail}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Phone:</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {selectedLead.countryCode} {selectedLead.phoneNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Practice:</span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedLead.practiceName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Role:</span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedLead.role}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Specialty:</span>
                  <p className="font-bold text-teal-600 dark:text-teal-400">{selectedLead.specialty}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Primary Service:</span>
                  <p className="font-bold text-brand dark:text-teal-300">{selectedLead.primaryService}</p>
                </div>
              </div>

              {/* Operational Challenges Message */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Reported Operational Challenges:
                </span>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedLead.challenges || "No additional challenges text provided."}
                </div>
              </div>

              {/* Date & Status */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </span>
                <span className="font-bold text-teal-600 dark:text-teal-400">
                  Status: {selectedLead.status}
                </span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <a
                href={`mailto:${selectedLead.workEmail}?subject=Re:%20gosvizzera%20Healthcare%20Strategy%20Session&body=Hi%20${selectedLead.firstName},%0D%0A%0D%0AThank%20you%20for%20reaching%20out%20to%20gosvizzera%20regarding%20${selectedLead.primaryService}.`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
