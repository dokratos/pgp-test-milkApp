"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const milkDB_json_1 = __importDefault(require("./milkDB.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/milk', (_req, res) => {
    try {
        return res.status(200).json({ db: milkDB_json_1.default });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
// app.get('/api/puppies/:id', async (req: Request, res: Response) => {
//   try {
//       const { id } = req.params;
//       const puppy = db.find(item => item.id === Number(id));
//       if (!puppy) {
//           return res.status(404).send('Puppy not found!');
//       }
//       const index = db.findIndex(item => item.id === Number(id));
//       const query = puppy.breed.split(' ').join('+').toLowerCase()
//       const img = await getPhoto(`${query}`)
//       const newPuppy = {...puppy, img: img}
//       db.splice(index, 1, newPuppy);
//       return res.status(200).send(newPuppy);
//   } catch (error) {
//       return res.status(500).json({ error: error});
//   }
// });
exports.default = app;
