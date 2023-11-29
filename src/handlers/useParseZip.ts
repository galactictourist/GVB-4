import JSZip from "jszip";
import LayerInfo from "@/types/layerInfo";
import Layer from "@/types/layer";

interface ParsedData {
  file: any;
  layers: Layer[];
}

export const useParseZip = () => {
  const parseZip = async (imagesZip: File, layers: LayerInfo[]): Promise<ParsedData | null> => {
    // tabulate layers to display layer info to user
    const parsedLayers: Layer[] = [];
    const newZip = new JSZip();

    const zip = await JSZip.loadAsync(imagesZip);
    const paths = Object.keys(zip.files);

    // rename uploaded images with generated weight and create a new zip file
    const isDone = await new Promise(async (resolve) => {
      for (const layer of layers) {
        const { name, priorityType } = layer;
        const totalTraits = layer.traits.length;

        let parsedLayer = {
          name,
          count: 0,
        };

        for (let i = 0; i < layer.traits.length; i++) {
          const trait = layer.traits[i];
          const filePath = paths.find((path) =>
            path.match(new RegExp(`${layer.name}/${trait}.png`, "i"))
          );
          const imageFile = filePath && zip.file(filePath);
          const traitOrder = (priorityType === "o" ? i : 1) + 1;

          if (filePath && imageFile) {
            const rawImage = await imageFile.async("uint8array");
            const imageBlob = new Blob([rawImage], { type: "image/png" });
            const weight = _calculateWeight(totalTraits, traitOrder);

            newZip.file(`${name}/${trait}#${weight}.png`, imageBlob);
            parsedLayer.count += 1;
          }
        }

        parsedLayers.push(parsedLayer);
      }

      resolve(true);
    });

    if (isDone) {
      const blob = await newZip.generateAsync({ type: "blob" });
      const newZipFile = new File([blob], "images.zip", {
        type: "application/zip",
      });

      return {
        file: newZipFile,
        layers: parsedLayers,
      };
    }

    return null;
  };

  const _calculateWeight = (totalTraits: number, traitOrder: number) => {
    const percentage = (totalTraits - traitOrder + 1) / totalTraits;
    const weight = Math.pow(percentage, 3) * (totalTraits * 400);
    return Math.round(weight);
  };

  return {
    parseZip,
  };
};
