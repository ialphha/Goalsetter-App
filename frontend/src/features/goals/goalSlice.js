import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import goalService from "./goalService";

const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

//create new Goal
export const createGoal = createAsyncThunk(
	"goals/create",
	async (goal, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalService.createGoal(goal, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//get Goals:
export const getGoals = createAsyncThunk(
	"goals/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalService.getGoals(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
export const editGoal = createAsyncThunk(
	"goals/edit",
	async (goal, thunkAPI) => {
		try {
			const { text, id } = goal;
			const token = thunkAPI.getState().auth.user.token;
			return await goalService.editGoal(text, id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
//  delete goal:
export const deleteGoal = createAsyncThunk(
	"goals/delete",
	async (goalId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalService.deleteGoal(goalId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;

				// pushing one goal to the goals in state
				state.goals.push(action.payload);
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// adding list of goals from the backend
				state.goals = action.payload;
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				//filtering the deleted goal from the state "goals"
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload.id
				);
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(editGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				console.log("editgoal action", action);
				//removing previous goal
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload._id
				);
				// pushing one goal to the goals in state
				state.goals.push(action.payload);
			})
			.addCase(editGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				// console.log(action);
				state.message = action.payload;
			});
	},
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
