"use client";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FaCheckCircle, FaEdit, FaTimesCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Modal from "../../components/modal";
import { CheckboxContext } from "../../context/checkbox-context";

interface ActionsButtonsProps {
  sourceId: number;
  onEdit: (sourceId: number) => Promise<{
    success: boolean;
    data: {
      id: number;
      name: string;
      url: string;
      lastUpdateAt: Date;
      isActive: boolean;
    } | null;
    message: string;
  }>;
  onUpdate: (
    sourceId: number,
  ) => Promise<{ success: boolean; message: string }>;
  onDelete: (
    sourceId: number,
  ) => Promise<{ success: boolean; message: string }>;
}

interface FormData {
  name: string;
  url: string;
  isActive: boolean;
}

function ActionsButtons({
  sourceId,
  onEdit,
  onUpdate,
  onDelete,
}: ActionsButtonsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceData, setSourceData] = useState<{
    id: number;
    name: string;
    url: string;
    lastUpdateAt: Date;
    isActive: boolean;
  } | null>(null);
  const { handleClearAll } = useContext(CheckboxContext);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const { success, data, message } = await onEdit(sourceId);
      if (success) {
        setSourceData(data);
        setIsModalOpen(true);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleClearAll();
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSourceData(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    if (sourceData) {
      setValue("name", sourceData.name);
      setValue("url", sourceData.url);
      setValue("isActive", sourceData.isActive);
    }
  }, [sourceData, setValue]);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const { success, message } = await onUpdate(sourceId);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleClearAll();
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { success, message } = await onDelete(sourceId);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleClearAll();
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleEdit}
          disabled={isLoading}
          className={`${isLoading ? "text-gray-400 hover:text-gray-400" : "text-yellow-500 hover:text-yellow-600"}`}
        >
          <FaEdit size={24} />
        </button>
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className={`${isLoading ? "text-gray-400 hover:text-gray-400" : "text-green-500 hover:text-green-600"}`}
        >
          <FaCheckCircle size={24} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={`${isLoading ? "text-gray-400 hover:text-gray-400" : "text-red-500 hover:text-red-600"}`}
        >
          <FaTimesCircle size={24} />
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {sourceData && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Edit Source</h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleModalClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    defaultValue={sourceData.name}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">
                      {(errors.name as FieldError).message}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    type="text"
                    id="url"
                    defaultValue={sourceData.url}
                    {...register("url", {
                      required: {
                        value: true,
                        message: "URL is required",
                      },
                    })}
                  />
                  {errors.url && (
                    <div className="text-red-500">
                      {(errors.url as FieldError).message}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastUpdateAt">Last Update At</Label>
                  <Input
                    type="text"
                    id="lastUpdateAt"
                    name="lastUpdateAt"
                    defaultValue={new Date(
                      sourceData.lastUpdateAt,
                    ).toLocaleString()}
                    disabled
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      id="isActive"
                      name="isActive"
                      defaultChecked={sourceData.isActive}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="isActive">Is Active</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button type="submit">Save</Button>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </Fragment>
  );
}

export default ActionsButtons;
