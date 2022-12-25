import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { editGoal } from "../features/goals/goalSlice";

function GoalItem(props) {
	const { goal } = props;
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [text, setText] = useState("");

	const changeEditable = () => {
		setText(goal.text);
		setEditable(!editable);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(editGoal({ text, id: goal._id }));
		setEditable(!editable);
	};
	return (
		<div className="goal">
			<div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
			{editable ? (
				<div>
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="text"> Goal</label>
							<input
								type="text"
								name="text"
								id="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<button className="btn btn-block" typeof="submit">
								Edit Goal
							</button>
						</div>
					</form>
				</div>
			) : (
				<h3>{goal.text}</h3>
			)}
			<div className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
				X
			</div>
			<div
				className="edit"
				onClick={() => {
					changeEditable();
				}}
			>
				<FaEdit />
			</div>
		</div>
	);
}

export default GoalItem;
