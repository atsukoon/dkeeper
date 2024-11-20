import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props) {
  const { id, title, content, onDelete } = props;

  function handleClick() {
    onDelete(id);
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}
