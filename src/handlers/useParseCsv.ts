import { parse } from "csv-parse";
import Record from "@/types/record";
import Layer from "@/types/layer";

interface LayerCount {
  [key: string]: number;
}

interface CSVData {
  records: Record[],
  layers: Layer[]
}

export const useParseCsv = () => {
  const parseCsv =  (file: File): Promise<CSVData> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
      
        reader.onload = () => {
          console.log({result: reader.result})
          if (reader.result) {
            parse(reader.result.toString(), { columns: true }, (err, records) => {
              const layers = _readLayers(records);
              resolve({records, layers});
            });
          }
        };
      } catch (error) {
        reject(error);
      }
    })
  };

  const _readLayers = (records: Record[]) => {
    const layersCount: LayerCount  = {};

    records.forEach(record => {
      const property = record["Layer"];

      if(!layersCount.hasOwnProperty(property)) {
        layersCount[property] = 0;
      }

      layersCount[property] += 1;
    });

    return Object.keys(layersCount).map(layer => ({
      name: layer,
      count: layersCount[layer]
    }));
  };

  return {
    parseCsv
  };
};