import { parse } from "csv-parse";
import Record from "@/types/record";
import LayerInfo from "@/types/layerInfo";

export const useParseCsv = () => {
  const parseCsv = (file: File): Promise<LayerInfo[]> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
          if (reader.result) {
            parse(
              reader.result.toString(),
              { columns: true },
              (err, records) => {
                const layers = _processLayers(records);
                resolve(layers);
              }
            );
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  const _processLayers = (records: Record[]): LayerInfo[] => {
    const layers: LayerInfo[] = [];
    let layerInfo: LayerInfo = {
      name: "",
      priorityType: "",
      traits: [],
    };

    records.forEach((record, i) => {
      const { layer, trait, ordered } = record;

      if (layerInfo.name !== layer && ordered) {
        if (layerInfo.name !== "") {
          layers.push(layerInfo);
        }

        layerInfo = {
          name: layer,
          priorityType: ordered.toLowerCase(),
          traits: [],
        };
      }

      if (layer && trait) {
        layerInfo.traits.push(trait);
      }
    });

    return layers;
  };

  return {
    parseCsv,
  };
};
