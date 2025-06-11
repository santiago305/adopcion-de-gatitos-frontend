import React, {  useState } from "react";
import SidebarForm from "@/components/form/SidebarForm";
import Table from "@/components/Table"; 
import Modal from "@/components/Modal"; 
import { Button } from "../ui/button";
interface DashboardFormProps {
  title: string;
  columns: { label: string; field: string }[]; 
  children: React.ReactElement<{ onSubmit: (newData: any) => void }>; 
}

export default function DashboardForm({ title, columns, children }: DashboardFormProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCreateClick = () => {
    setIsSidebarOpen(true);
  };


  const handleAddData = (newData: any) => {
    setData((prevData) => [...prevData, newData]); 
    setIsSidebarOpen(false);
  };

   const handleRowClick = (rowData: any) => {
    setSelectedRow(rowData); 
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-4xl font-bold">{title}</h1>

      {data.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <Button
            onClick={handleCreateClick}
            className="cursor-pointer"
          >
            Crear {title.toLowerCase()}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCreateClick}
              className="cursor-pointer"
            >
              Crear más {title.toLowerCase()}
            </Button>
          </div>
          <Table data={data} columns={columns} onRowClick={handleRowClick} />
        </>
      )}

      {isSidebarOpen && (
        <SidebarForm onClose={() => setIsSidebarOpen(false)} side="right">
          {React.cloneElement(children, {
            onSubmit: handleAddData, 
          })}
        </SidebarForm>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedRow} />
    </div>
  );
}
