import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // for dispatch for event dispatch
export const useAppSelector = useSelector.withTypes<RootState>(); // for read
