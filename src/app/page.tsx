"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Note from "@/components/Core/Note";
import styles from "./home.style";
import UploadFileButton from "@/components/Core/UploadFileButton";
import { useParseCsv } from "@/handlers/useParseCsv";
import { ERRORS, NOTES } from "./constants";
import { useParseZip } from "@/handlers/useParseZip";
import Layer from "@/types/layer";
import {
  CollectionSchema,
  CollectionInput,
  defaultCollectionState,
} from "@/schemas/Collection.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputRow from "@/components/Core/InputRow";
import Stack from "@mui/material/Stack";

export default function HomePage() {
  const {
    watch,
    reset,
    control,
  } = useForm<CollectionInput>({
    defaultValues: defaultCollectionState,
    resolver: zodResolver(CollectionSchema),
  });
  const namePrefix = watch("namePrefix");
  const description = watch("description");
  const amount = watch("amount");

  const { parseCsv } = useParseCsv();
  const { parseZip } = useParseZip();
  const [linkValue, setLinkValue] = useState("");
  const [zipFile, setZipfile] = useState<File | null>(null);
  const [csvFile, setCsvfile] = useState<File | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [processedZipFile, setProcessedZipfile] = useState<File | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingErrors, setProcessingErrors] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

  const onGenerateHandler = async () => {
    setIsGenerating(true);

    const collectionDetails = { namePrefix, description };
    const layerConfigs = [
      {
        growEditionSizeTo: amount,
        layersOrder: layers.map((layer) => ({ name: layer.name })),
      },
    ];

    const data = new FormData();
    data.append("zipFile", processedZipFile!);
    data.append("collectionDetails", JSON.stringify(collectionDetails));
    data.append("layerConfigs", JSON.stringify(layerConfigs));

    const url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_BACKEND
        : process.env.PROD_BACKEND;
    const res = await fetch(`${url}/upload`, {
      method: "POST",
      body: data,
    });

    setIsGenerating(false);
    if (res.status === 200) {
      const blob = await res.blob();
      const file = URL.createObjectURL(
        new Blob([blob], { type: "application/zip" })
      );
      setLinkValue(file);
    } else {
      setLinkValue("");
      setIsApiError(true);
    }
  };

  const formValidation = () => {
    return !(
      namePrefix !== "" &&
      description !== "" &&
      amount > 0 &&
      processedZipFile &&
      layers.length > 0
    );
  };

  const calculateTotal = (layers: Layer[]) => {
    if (layers.length === 0) {
      return 0;
    }

    return layers.reduce((count, layer) => count * layer.count, 1);
  };

  const resetState = () => {
    reset();
    setZipfile(null);
    setCsvfile(null);
    setLinkValue("");
  };

  const processImages = async () => {
    try {
      if (csvFile && zipFile) {
        setIsProcessing(true);
        const records = await parseCsv(csvFile);
        const data = await parseZip(zipFile, records);

        if (data) {
          setLayers(data.layers);
          setProcessedZipfile(data.file);
          setIsProcessing(false);
        }
      }
    } catch (error) {
      setIsProcessing(false);
      setProcessingErrors(true);
    }
  };

  useEffect(() => {
    processingErrors && setProcessingErrors(false);
  }, [zipFile, csvFile]);

  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.contentStyle}>
        <Box sx={styles.flexColStyle}>
          <Typography variant="h6">File Uploads</Typography>
          <Box sx={styles.uploadBoxStyle}>
            <UploadFileButton
              fileName={csvFile ? csvFile.name : "Upload CSV"}
              fileType=".csv"
              onChangeHandler={(file: File) => setCsvfile(file)}
            />
            <UploadFileButton
              fileName={zipFile ? zipFile.name : "Upload Zip"}
              fileType=".zip"
              onChangeHandler={(file: File) => setZipfile(file)}
            />
          </Box>
          <Note description={NOTES.UPLOADS} />
          <Box>
            <Button
              sx={styles.fullWidthStyle}
              color="success"
              variant="contained"
              disabled={!(csvFile && zipFile)}
              onClick={processImages}
            >
              {!isProcessing && "Process Images"}
              {isProcessing && (
                <Stack sx={{ color: "white" }}>
                  <CircularProgress size={24} color="inherit" />
                </Stack>
              )}
            </Button>
            {processingErrors && (
              <FormHelperText error>{ERRORS.PROCESSING}</FormHelperText>
            )}
          </Box>
        </Box>
        <FormControl sx={styles.flexColStyle} variant="standard">
          <Box sx={styles.flexColStyle}>
            <Typography variant="h6">Collection Details</Typography>
            <Box>
              <InputRow
                sx={styles.inputStyleOne}
                label="Collection Name"
                fieldName="namePrefix"
                control={control}
              />
              <InputRow
                sx={styles.inputStyleOne}
                label="Collection Description"
                fieldName="description"
                control={control}
              />
              <InputRow
                sx={styles.inputStyleTwo}
                label="Amount of NFT to generate"
                fieldName="amount"
                control={control}
              />
              <Note
                description={`Total number of possible combinations: ${calculateTotal(
                  layers
                )}`}
              />
            </Box>
            <Note description={NOTES.COLLECTION} />
          </Box>
          <Box sx={styles.flexColStyle}>
            <Typography variant="h6">Layers</Typography>
            <Box>
              {layers.length === 0 && (
                <Typography>Files have not been uploaded yet.</Typography>
              )}
              {layers.length > 0 &&
                layers.map((layer, i) => (
                  <Box key={i} sx={styles.rowStyle}>
                    <Typography>
                      Layer {i + 1}: {layer.name}
                    </Typography>
                    <Typography>{layer.count} images</Typography>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box sx={styles.flexColStyle}>
            <Button
              sx={styles.fullWidthStyle}
              variant="contained"
              disabled={formValidation()}
              onClick={onGenerateHandler}
            >
              Generate
            </Button>
            <Box>
              <Button
                sx={styles.fullWidthStyle}
                variant="contained"
                disabled={linkValue === ""}
                href={linkValue}
                download={`${namePrefix}.zip`}
                onClick={resetState}
              >
                {isGenerating && <CircularProgress size={24} />}
                {!isGenerating &&
                  (linkValue === "" ? "Download ..." : `${namePrefix}.zip`)}
              </Button>
              {isApiError && (
                <FormHelperText error>{ERRORS.GENERATE}</FormHelperText>
              )}
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
}
