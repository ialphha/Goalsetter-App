import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

function GoalItem(props) {
	const { goal } = props;
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);

	return (
		<div className="goal">
			<div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
			<h3>{goal.text}</h3>
			<div className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
				X
			</div>
			<div className="edit" onClick={() => {}}>
				<FaEdit />
			</div>
		</div>
	);
}

export default GoalItem;
