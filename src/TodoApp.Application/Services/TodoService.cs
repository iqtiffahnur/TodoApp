using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.Core.Entities;
using TodoApp.Core.Interfaces;

namespace TodoApp.Application.Services
{
    public class TodoService
    {
        private readonly ITodoRepository _repo;

        public TodoService(ITodoRepository repo)
        {
            _repo = repo;
        }

        public Task<List<TodoItem>> GetAllAsync() => _repo.GetAllAsync();
        public Task<TodoItem?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);

        public Task<TodoItem> CreateAsync(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new System.ArgumentException("Title cannot be empty.");

            var item = new TodoItem { Title = title, IsCompleted = false };
            return _repo.AddAsync(item);
        }

        public async Task UpdateAsync(int id, string newTitle, bool? completed = null)
        {
            if (string.IsNullOrWhiteSpace(newTitle))
                throw new System.ArgumentException("Title cannot be empty.");

            var item = await _repo.GetByIdAsync(id);
            if (item == null) throw new System.Exception("Todo not found.");

            item.Title = newTitle;
            if (completed.HasValue) item.IsCompleted = completed.Value;

            await _repo.UpdateAsync(item);
        }

        public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
    }
}