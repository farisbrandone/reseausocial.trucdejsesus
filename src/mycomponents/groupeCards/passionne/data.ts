type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "489e1d45",
    amount: 180,
    status: "pending",
    email: "faris@gmail.com",
  },
  {
    id: "489e1d49",
    amount: 160,
    status: "pending",
    email: "brandone@gmail.com",
  },
  {
    id: "489e1d55",
    amount: 150,
    status: "pending",
    email: "brandone@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 140,
    status: "pending",
    email: "eric@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 130,
    status: "pending",
    email: "omer@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 130,
    status: "pending",
    email: "omer@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 130,
    status: "pending",
    email: "omer@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 130,
    status: "pending",
    email: "omer@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 130,
    status: "pending",
    email: "omer@gmail.com",
  },
  {
    id: "489e1d53",
    amount: 130,
    status: "pending",
    email: "omer@gmail.com",
  },
  // ...
];
