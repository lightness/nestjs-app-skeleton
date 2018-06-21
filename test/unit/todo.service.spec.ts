import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';

import { Symbols } from '../../src/constants';
import { DatabaseModule } from '../../src/database/database.module';
import Todo from '../../src/todo/todo.model';
import { TodoService } from '../../src/todo/todo.service';

describe('TodoService', () => {
    let service: TodoService;
    let sequelize: Sequelize;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [
                {
                    provide: Symbols.Repository.Todo,
                    useFactory: () => Todo,
                    inject: [Symbols.Sequelize],
                },
                TodoService,
            ],
        }).compile();

        sequelize = module.get<Sequelize>(Symbols.Sequelize);
        service = module.get<TodoService>(TodoService);
    });

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('.findAll()', () => {
        // TODO: Implement me
    });

    describe('.create()', () => {
        it('should create Todo', async () => {
            const todo = new Todo();
            todo.title = 'title';
            todo.text = 'text';

            const createdTodo = await service.create(todo);

            expect(createdTodo).toBeDefined();
            expect(createdTodo).toEqual(expect.any(Todo));
        });
    });
});
