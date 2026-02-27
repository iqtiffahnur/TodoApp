using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.Core.Entities;
using TodoApp.Core.Interfaces;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Repositories
{
    public class EfTodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _db;

        public EfTodoRepository(TodoDbContext db)
        {
            _db = db;
        }

        public Task<List<TodoItem>> GetAllAsync() =>
            _db.TodoItems.AsNoTracking().ToListAsync();

        public Task<TodoItem?> GetByIdAsync(int id) =>
            _db.TodoItems.FindAsync(id).AsTask();

        public async Task<TodoItem> AddAsync(TodoItem item)
        {
            _db.TodoItems.Add(item);
            await _db.SaveChangesAsync();
            return item;
        }

        public async Task UpdateAsync(TodoItem item)
        {
            _db.TodoItems.Update(item);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.TodoItems.FindAsync(id);
            if (entity != null)
            {
                _db.TodoItems.Remove(entity);
                await _db.SaveChangesAsync();
            }
        }
    }
}