import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { access } from "fs";
import { RootState } from "../../store";
import { baseUrl } from "../../url";
import {
  archiImg,
  ceitImg,
  chemImg,
  civilImg,
  ecImg,
  epImg,
  foodImg,
  mceImg,
  mechImg,
  metalImg,
  miningImg,
  textileImg,
} from "../../url";

export interface Book {
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
  status?: "idle" | "cart";
}

interface Department {
  books: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

interface DepartmentBook {
  [index: string]: Department;
}

interface InitialState {
  departments: DepartmentBook;
  searchStatus: "idle" | "loading" | "succeeded" | "failed";
  searchResults: Book[];
}
interface SingleDepartmentInterface {
  fullName: string;
  shortName: string;
  picture: string;
}

export const departmentList: SingleDepartmentInterface[] = [
  {
    fullName: "Architecture",
    shortName: "Arch",
    picture: archiImg,
  },
  {
    fullName: "Civil Engineering",
    shortName: "C",
    picture: civilImg,
  },
  {
    fullName: "Chemical Engineering",
    shortName: "ChE",
    picture: chemImg,
  },
  {
    fullName: "Computer Engineering and Information Technology",
    shortName: "CEIT",
    picture: ceitImg,
  },
  {
    fullName: "Electronic Engineering",
    shortName: "EC",
    picture: ecImg,
  },
  {
    fullName: "Electrical Power Engineering",
    shortName: "EP",
    picture: epImg,
  },
  {
    fullName: "Food Engineering",
    shortName: "FE",
    picture: foodImg,
  },
  {
    fullName: "Mechanical Engineering",
    shortName: "Mech",
    picture: mechImg,
  },
  {
    fullName: "Mechatronic Engineering",
    shortName: "McE",
    picture: mceImg,
  },
  {
    fullName: "Metallurgical Engineering",
    shortName: "Met",
    picture: metalImg,
  },
  {
    fullName: "Mining Engineering",
    shortName: "Mn",
    picture: miningImg,
  },
  {
    fullName: "Textile Engineering",
    shortName: "Tex",
    picture: textileImg,
  },
];

const departmentShortNames = departmentList.map(
  (department) => department.shortName
);

const initialState: InitialState = {
  departments: {},
  searchStatus: "idle",
  searchResults: [],
};

departmentShortNames.forEach((shortName) => {
  initialState.departments[shortName] = {
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
      const cartItems = getState().cart.items;
      const booksWithStatus = booksByDepartment.map((book: any) => {
        //check item is in cart
        if (cartItems.some((cartBook) => cartBook._id === book._id)) {
          book.status = "cart";
        } else {
          book.status = "idle";
        }
        return book;
      });
      return booksWithStatus;
    } catch (error) {
      return rejectWithValue("");
    }
  }
);

const searchBookByTitle = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string; state: RootState }
>("book/searchBookByTitle", async (title, { rejectWithValue, getState }) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
  };
  try {
    const response = await fetch(
      `${baseUrl}/book/title/${title}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error();
    }
    const { books } = await response.json();
    const cartItems = getState().cart.items;
    const booksWithStatus = books.map((book: any) => {
      //check book in cart
      if (cartItems.some((cartBook) => cartBook._id === book._id)) {
        book.status = "cart";
      } else {
        book.status = "idle";
      }
      return book;
    });
    return booksWithStatus;
  } catch (error) {
    return rejectWithValue("");
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    markBookAsInCart: (state, action) => {
      const { departmentId, bookId } = action.payload;
      const index = state.departments[departmentId].books.findIndex(
        (book) => book._id === bookId
      );
      if (index > -1) {
        state.departments[departmentId].books[index].status = "cart";
      }
    },
    markBookFromSearchResults: (state, action) => {
      const index = state.searchResults.findIndex(
        (book) => book._id === action.payload
      );
      state.searchResults[index].status = "cart";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooksByDepartment.pending, (state, action) => {
        state.departments[action.meta.arg].status = "loading";
      })
      .addCase(fetchBooksByDepartment.fulfilled, (state, action) => {
        state.departments[action.meta.arg].status = "succeeded";
        state.departments[action.meta.arg].books = action.payload;
      })
      .addCase(fetchBooksByDepartment.rejected, (state, action) => {
        state.departments[action.meta.arg].status = "failed";
      })

      .addCase(searchBookByTitle.pending, (state, action) => {
        state.searchStatus = "loading";
      })
      .addCase(searchBookByTitle.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchBookByTitle.rejected, (state, action) => {
        state.searchStatus = "failed";
      });
  },
});

const SelectSearchStatus = (state: RootState) => state.book.searchStatus;
const SelectSearchResults = (state: RootState) => state.book.searchResults;

export { SelectSearchResults, SelectSearchStatus };
export { fetchBooksByDepartment, searchBookByTitle };

export const { markBookAsInCart, markBookFromSearchResults } =
  bookSlice.actions;

export default bookSlice.reducer;
