import { useState } from "react";

const DEFAULT_LAYER_STATE = ["Background", ""];
export const DEFAULT_FORMDATA = {
  namePrefix: "",
  description: "",
  layerNames: DEFAULT_LAYER_STATE,
  nftAmount: "0",
  zipFile: null,
};

export interface FormData {
  namePrefix: string;
  description: string;
  layerNames: string[];
  nftAmount: string;
  zipFile: File | null;
}

export const useForm = () => {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORMDATA);
  const [error, setError] = useState(false);

  const inputHandler = (e: any) => {
    setError(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const layerInputHandler = (index: number, value: string) => {
    setError(false);
    const layers = [...formData.layerNames];
    layers[index] = value;
    setFormData({
      ...formData,
      layerNames: layers,
    });
  };

  const addHandler = () => {
    setError(false);
    setFormData({
      ...formData,
      layerNames: [...formData.layerNames, ""],
    });
  };

  const zipFileHandler = (file: File) => {
    setFormData({
      ...formData,
      zipFile: file,
    });
  };

  return {
    formData,
    setFormData,
    inputHandler,
    layerInputHandler,
    addHandler,
    zipFileHandler,
    error,
    setError
  };
};
