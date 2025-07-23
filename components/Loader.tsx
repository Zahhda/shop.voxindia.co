"use client";
import { FC } from "react";
import { SyncLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  color?: string;
  loading?: boolean;
}
// <SyncLoader />
const Loader: FC<LoaderProps> = ({ size = 15, color = "#e80808", loading = true }) => (
  <div className="flex items-center justify-center h-full w-full">
    <SyncLoader size={size} color={color} loading={loading} />
  </div>
);

export default Loader;
