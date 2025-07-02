import { Router } from "express";
import { createtodo, updatetodoById, deletetodoById , findManytodo ,findtodoById} from './todo.service.js';

const router = Router();

router.post("/todo", async (req, res) => {
    try { 
        const newtodo = await createtodo(req.body);
        res.send(newtodo);
    }catch (error) {
        res.status(500).send({ error: error.message });
    }
   
});

router.patch("/todo/:id", async (req, res) => {
    try {
        const updated = await updatetodoById(req.params.id, req.body);
        console.log(updated);
       res.send(await updatetodoById(req.params.id, req.body));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);

router.delete("/todo/:id", async (req, res) => {
    try {
        await deletetodoById(req.params.id);
        res.send({
            id: req.params.id,
            message: "Todo deleted successfully",
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.get("/todo/:id", async (req, res) => {
    try {
        const todo = await findtodoById(req.params.id);
        if (!todo) {
            return res.status(404).send({ error: "Todo not found" });
        }
        res.send(todo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get("/todo", async (req, res) => {
    try {
        const list = await findManytodo(req.query);
        res.send(list);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export { router }