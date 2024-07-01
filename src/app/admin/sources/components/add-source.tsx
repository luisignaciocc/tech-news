"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Modal from "../../components/modal";

interface FormData extends FieldValues {
  name: string;
  url: string;
  isActive: boolean;
}

function AddSource() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <Button
        className="bg-primary hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
        onClick={handleOpenModal}
      >
        Add Source
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Source</h2>
          <button onClick={handleCloseModal}>
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
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                type="text"
                id="url"
                {...register("url", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.url && (
                <span className="text-red-500">Please enter a valid URL</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="items-top flex space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  {...register("isActive")}
                />

                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="isActive"> Is Active</Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="secondary"
              className="mr-2"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddSource;
