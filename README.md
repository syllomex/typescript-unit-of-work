# Unit of Work in TypeScript with Prisma

## What is this

> A unit of work is a behavioral pattern in software development. Martin Fowler has defined it as everything one does during a business transaction which can affect the database. When the unit of work is finished it will provide everything that needs to be done to change the database as a result of the work.<br>[Wikipedia](https://en.wikipedia.org/wiki/Unit_of_work)

Basically, this project is an example of an **Unit of Work** abstraction in **TypeScript** using the transaction function from **Prisma ORM**.

The goal is to be able to create a decoupled class to execute a transaction within the function provided by Prisma.

It is important to point out that this same logic can be used for any ORM or QueryBuilder that provides a transaction object. In other cases, I believe a different logic would be needed.

## How to Run

For running the unit tests, just run the npm "test" command

```sh
npm test
```

For running the integration tests, first you need to start the docker container, run the migrations, then run the npm command

```sh
# in project root
docker compose up -d

# wait for the container initialization, then
npx prisma migrate dev

# finally
npm run test:integration
```

You can also run all the tests with the command

```sh
npm run test:all
```

## What is happening

In the **SignUp** use case two different repositories are called to save the **Account** and the **Profile** in different database tables. These repositories are **AccountRepository** and **ProfileRepository**

If the `AccountRepository.save` fails, the `ProfileRepository.save` should not be called, and the **Account** should NOT be saved in the database, which means that a **rollback** should be done.

The **Unit Of Work** receives the repositories and injects the transaction into them, making it possible to share the transaction between repositories.

Repository operations must be performed within the `uow.transaction` method, this way the transaction will be injected. Every repository operation inside it should be rolled back if any error is thrown within the transaction.

## Contributing

If you have any idea for improving this, feel free to open an issue or create a pull request the way you want. There are no rules.
