import { useState, useEffect } from "react";
import { getNormalRange, getFixedRange } from "@/api/services";

type RangeType = "normal" | "fixed";

export function useRangeData(type: RangeType) {
  const [data, setData] = useState<{
    min?: number;
    max?: number;
    rangeValues?: number[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (type === "normal") {
          result = await getNormalRange();
          if (result?.min !== undefined && result?.max !== undefined) {
            setData(result);
          } else {
            throw new Error("Invalid normal range response.");
          }
        } else {
          result = await getFixedRange();
          if (Array.isArray(result) && result.length > 0) {
            setData({ rangeValues: result });
          } else {
            throw new Error("Invalid fixed range response.");
          }
        }
      } catch (err) {
        setError(`Failed to fetch range. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { data, loading, error, setData };
}
