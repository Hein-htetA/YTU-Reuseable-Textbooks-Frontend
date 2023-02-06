import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { baseUrl } from "../../url";
import { departmentList } from "../main/IndexPage/DepartmentList";

interface Book {
  _id: string;
  title: string;
  edition: string;
  author: string;
  lastOwnerName: string;
  lastOwnerRollNo: string;
  amountInStock: number;
  bookPhotoId: string;
  bookPhotoUrl: string;
  price: number;
  availableChapters: number[];
  departments: string[];
  year: number[];
}

interface Department {
  books: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

interface InitialState {
  [index: string]: Department;
}

const departmentShortNames = departmentList.map(
  (department) => department.shortName
);

const initialState: InitialState = {};

departmentShortNames.forEach((shortName) => {
  initialState[shortName] = {
    books: [],
    status: "idle",
  };
});

const fetchBooksByDepartment = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string; state: RootState }
>(
  "book/fetchBookByDepartment",
  async (departmentId, { rejectWithValue, getState }) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    };
    try {
      const response: any = await fetch(
        `${baseUrl}/book/department/${departmentId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { booksByDepartment } = await response.json();
      return booksByDepartment;
    } catch (error) {
      return rejectWithValue("");
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBooksByDepartment.pending, (state, action) => {
        state[action.meta.arg].status = "loading";
      })
      .addCase(fetchBooksByDepartment.fulfilled, (state, action) => {
        state[action.meta.arg].status = "succeeded";
        state[action.meta.arg].books = action.payload;
      })
      .addCase(fetchBooksByDepartment.rejected, (state, action) => {
        state[action.meta.arg].status = "failed";
      });
  },
});

export { fetchBooksByDepartment };

export default bookSlice.reducer;
