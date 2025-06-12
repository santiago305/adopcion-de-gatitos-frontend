import React, { useEffect, useState, useRef } from "react";
import SidebarForm from "@/components/form/SidebarForm";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "../ConfirmModal";

interface DashboardFormProps {
  title: string;
  columns: { label: string; field: string }[];
  children: React.ReactElement<any>;
  modalFieldLabels?: Record<string, string>;
  modalHiddenFields?: string[];
  fetchDataFn: (page: number, limit: number) => Promise<any>;
  deleteFn: (id: string) => Promise<any>;
  findOneFn?: (name: string) => Promise<any[]>; // 👈 nuevo parámetro opcional
  limit?: number;
}

export default function DashboardForm({
  title,
  columns,
  children,
  modalFieldLabels,
  modalHiddenFields,
  fetchDataFn,
  deleteFn,
  findOneFn,
  limit = 15,
}: DashboardFormProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [search, setSearch] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async (page: number = 1) => {
    try {
      const response = await fetchDataFn(page, limit);
      setData(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const fetchByName = async (name: string) => {
    if (!findOneFn || !name.trim()) return fetchData(1); // fallback a todos
    try {
      const result = await findOneFn(name.trim());
      setData(result || []);
      setPagination({ currentPage: 1, totalPages: 1 }); // sin paginación cuando se busca
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClick = () => {
    setEditingData(null);
    setIsSidebarOpen(true);
  };

  const handleAddData = async () => {
    await fetchData(pagination.currentPage);
    setEditingData(null);
    setIsSidebarOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow?.id) return;
    try {
      await deleteFn(selectedRow.id);
      await fetchData(pagination.currentPage);
      setSelectedRow(null);
      setIsModalOpen(false);
      setIsConfirmOpen(false);
    } catch (error) {
      alert("Error al eliminar.");
      console.error(error);
    }
  };

  const handleRowClick = (rowData: any) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim().length === 0) {
        fetchData(1);
      } else {
        fetchByName(value);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-4xl font-bold">{title}</h1>

      <div className="flex justify-between mt-4 gap-2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder={`Buscar ${title.toLowerCase()} por nombre...`}
          className="w-full max-w-sm border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button onClick={handleCreateClick}>Crear {title.toLowerCase()}</Button>
      </div>

      <Table
        data={data}
        columns={columns}
        onRowClick={handleRowClick}
        currentPage={pagination?.currentPage || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={(page) => fetchData(page)}
      />

      {isSidebarOpen && (
        <SidebarForm onClose={() => setIsSidebarOpen(false)} side="right">
          {React.cloneElement(children, {
            onSubmit: handleAddData,
            defaultValues: editingData,
            mode: editingData ? "edit" : "create",
          })}
        </SidebarForm>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedRow || {}}
        fieldLabels={modalFieldLabels}
        hiddenFields={modalHiddenFields}
      >
        <div className="flex justify-end gap-2 mb-4">
          <Button
            onClick={() => {
              setEditingData(selectedRow);
              setIsModalOpen(false);
              setIsSidebarOpen(true);
            }}
            className="bg-white text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:bg-gray-100"
          >
            <FiEdit />
          </Button>

          <Button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-white text-red-600 hover:text-red-800 flex items-center gap-1 hover:bg-gray-100"
          >
            <FiTrash2 />
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`¿Estás seguro de que deseas eliminar esta ${title.toLowerCase()}?`}
      />
    </div>
  );
}
