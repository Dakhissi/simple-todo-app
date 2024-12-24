import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../actions/categories/categories.actions";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../actions/todos/todos.actions";

// Material UI components
import {
  Alert,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Fade,
  Collapse,              // <-- Import Fade
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Main() {
  // Local states
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
    category_id: null,
  });

  // Message / feedback
  const [message, setMessage] = useState({
    isTriggered: false,
    type: "",
    text: "",
  });
  
  // Dialog states
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);

  // Track if we are creating or editing
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTodos());
  }, [dispatch]);

  // Get updated data from store
  const allCategories = useSelector((state) => state.categories.categories);
  const allTodos = useSelector((state) => state.todos.todos);

  // Sync local states when store updates
  useEffect(() => {
    setCategories(allCategories);
    setTodos(allTodos);
  }, [allCategories, allTodos]);

  // ---------------------------
  // Handlers: Categories
  // ---------------------------
  const createCategoryHandler = () => {
    dispatch(createCategory(category))
      .then(() => {
        setMessage({
          isTriggered: true,
          type: "success",
          text: "Category created successfully",
        });
        setCategory({ name: "" });
        handleCloseCategoryModal();
      })
      .catch((error) => {
        setMessage({
          isTriggered: true,
          type: "danger",
          text: error.message,
        });
      });
  };

  const updateCategoryHandler = (id, data) => {
    dispatch(updateCategory(id, data))
      .then(() => {
        setMessage({
          isTriggered: true,
          type: "success",
          text: "Category updated successfully",
        });
        handleCloseCategoryModal();
      })
      .catch((error) => {
        setMessage({
          isTriggered: true,
          type: "danger",
          text: error.message,
        });
      });
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id))
      .then(() => {
        setMessage({
          isTriggered: true,
          type: "success",
          text: "Category deleted successfully",
        });
      })
      .catch((error) => {
        setMessage({
          isTriggered: true,
          type: "danger",
          text: error.message,
        });
      });
  };

  // ---------------------------
  // Handlers: Todos
  // ---------------------------
  const createTodoHandler = (todoData) => {
    dispatch(createTodo(todoData))
      .then(() => {
        setMessage({
          isTriggered: true,
          type: "success",
          text: "Todo created successfully",
        });
        setTodo({ title: "", completed: false, category_id: null });
        handleCloseTodoModal();
      })
      .catch((error) => {
        setMessage({
          isTriggered: true,
          type: "danger",
          text: error.message,
        });
      });
  };

  const updateTodoHandler = (id, todoData) => {
    dispatch(
      updateTodo(id, {
        title: todoData.title,
        completed: todoData.completed,
        category_id: todoData.category_id,
      })
    )
      .then(() => {
        setMessage({
          isTriggered: true,
          type: "success",
          text: "Todo updated successfully",
        });
        handleCloseTodoModal();
      })
      .catch((error) => {
        setMessage({
          isTriggered: true,
          type: "danger",
          text: error.message,
        });
      });
  };

  const deleteTodoHandler = (id) => {
    dispatch(deleteTodo(id))
      .then(() => {
        setMessage({
          isTriggered: true,
          type: "success",
          text: "Todo deleted successfully",
        });
      })
      .catch((error) => {
        setMessage({
          isTriggered: true,
          type: "danger",
          text: error.message,
        });
      });
  };

  // ---------------------------
  // Message close handler
  // ---------------------------
  const closeMessageHandler = () => {
    setMessage({
      isTriggered: false,
      type: "",
      text: "",
    });
  };

  // ---------------------------
  // Modal handlers
  // ---------------------------
  const handleOpenCategoryModal = (categoryToEdit = null) => {
    if (categoryToEdit) {
      // Edit mode
      setIsEditingCategory(true);
      setCategory({ ...categoryToEdit });
    } else {
      // Create mode
      setIsEditingCategory(false);
      setCategory({ name: "" });
    }
    setOpenCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setOpenCategoryModal(false);
  };

  const handleOpenTodoModal = (todoToEdit = null) => {
    if (todoToEdit) {
      // Edit mode
      setIsEditingTodo(true);
      setTodo({ 
        id: todoToEdit.id,
        title: todoToEdit.title,
        completed: todoToEdit.completed,
        category_id: todoToEdit.category?.id || null,
      });
    } else {
      // Create mode
      setIsEditingTodo(false);
      setTodo({ title: "", completed: false, category_id: null });
    }
    setOpenTodoModal(true);
  };

  const handleCloseTodoModal = () => {
    setOpenTodoModal(false);
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Todo App</h1>

      {/* Feedback Alert */}
      <Collapse in={message.isTriggered}>
        <Alert
            severity={message.type}
            onClose={closeMessageHandler}
            sx={{ marginBottom: 2 }}
        >
            {message.text}
        </Alert>
        </Collapse>

      {/* Buttons to open modals */}
      <div style={{ marginBottom: 20 }}>
        <Button variant="contained" onClick={() => handleOpenCategoryModal()}>
          + Add Category
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          onClick={() => handleOpenTodoModal()}
        >
          + Add Todo
        </Button>
      </div>

      {/* CATEGORIES LIST */}
      <h2>Categories</h2>
      <List>
        {categories.map((cat) => (
          // Fade the list item in
          <Fade in={true} timeout={500} key={cat.id}>
            <ListItem>
              <ListItemText primary={cat.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleOpenCategoryModal(cat)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => deleteCategoryHandler(cat.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Fade>
        ))}
      </List>

      {/* TODOS LIST */}
      <h2>Todos</h2>
      <List>
        {todos.map((td) => (
          // Fade the list item in
          <Fade in={true} timeout={500} key={td.id}>
            <ListItem>
              <Checkbox
                checked={td.completed}
                onChange={(e) =>
                  updateTodoHandler(td.id, {
                    ...td,
                    completed: e.target.checked,
                    // keep the same category
                    category_id: td.category?.id,
                  })
                }
              />
              
              {/* 
                For the "red line" effect, we wrap the text in a relative parent 
                and an absolutely positioned span that animates width (scaleX).
              */}
              <ListItemText
                primary={
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      // You can tweak color if you want completed text to be grayish, for instance
                      color: td.completed ? "#555" : "inherit",
                      transition: "color 0.3s ease-in-out",
                    }}
                  >
                    {td.title}
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: 2,
                        backgroundColor: "red",
                        // Animate from no line to full line
                        transform: td.completed ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left center",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                  </span>
                }
                secondary={`Category: ${td.category?.name || "No category"}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleOpenTodoModal(td)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTodoHandler(td.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Fade>
        ))}
      </List>

      {/* CATEGORY MODAL (Dialog) */}
      <Dialog open={openCategoryModal} onClose={handleCloseCategoryModal}>
        <DialogTitle>
          {isEditingCategory ? "Edit Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoryModal}>Cancel</Button>
          {isEditingCategory ? (
            <Button
              variant="contained"
              onClick={() =>
                updateCategoryHandler(category.id, { name: category.name })
              }
            >
              Update
            </Button>
          ) : (
            <Button variant="contained" onClick={createCategoryHandler}>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* TODO MODAL (Dialog) */}
      <Dialog open={openTodoModal} onClose={handleCloseTodoModal}>
        <DialogTitle>{isEditingTodo ? "Edit Todo" : "Create Todo"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo Title"
            fullWidth
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />

          {/* Category dropdown */}
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={todo.category_id || ""}
            onChange={(e) => setTodo({ ...todo, category_id: e.target.value })}
            SelectProps={{ native: true }}
            style={{ marginTop: 20 }}
          >
            <option value="" disabled>
              -- Select a category --
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </TextField>

          {/* Completed checkbox (optional) */}
          <div style={{ marginTop: 10 }}>
            <Checkbox
              checked={todo.completed}
              onChange={(e) =>
                setTodo({ ...todo, completed: e.target.checked })
              }
            />
            <span>Completed</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTodoModal}>Cancel</Button>
          {isEditingTodo ? (
            <Button
              variant="contained"
              onClick={() =>
                updateTodoHandler(todo.id, {
                  title: todo.title,
                  completed: todo.completed,
                  category_id: todo.category_id,
                })
              }
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                createTodoHandler({
                  title: todo.title,
                  completed: todo.completed,
                  category_id: todo.category_id,
                })
              }
            >
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
