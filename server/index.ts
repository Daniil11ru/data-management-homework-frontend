import express, { Request, Response } from  'express'
import cors from 'cors';

import agents from "./agents.json";
import agentTypes from "./agentTypes.json"

const app = express()
const port = 5000

const fs = require('fs');

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the Node.js!');
});

app.get("/agents", (req: Request, res: Response) => {
  res.json(agents);
});

app.get("/agents/types", (req: Request, res: Response) => {
  res.json(agentTypes);
});

const saveAgentsToFile = (agents: any[]) => {
  fs.writeFileSync("./agents.json", JSON.stringify(agents, null, 2), 'utf-8');
};

app.put('/agents/update', (req: Request, res: Response) => {
  let updatedAgent = req.body;

  const agentIndex = agents.findIndex(agent => agent.Id === updatedAgent.Id);

  if (agentIndex !== -1) {
    agents[agentIndex] = { ...updatedAgent };

    saveAgentsToFile(agents);

    res.status(200).json({ message: 'Агент обновлен', agent: agents[agentIndex] });
  } else {
    res.status(404).json({ message: 'Агент не найден' });
  }
});