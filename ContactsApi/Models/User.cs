using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models
{
    /// <summary>
    /// Represents a user in the application.
    /// </summary>
    public class User
    {
        /// <summary>
        /// The unique identifier for the user.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The username of the user.
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        /// <summary>
        /// The hashed password of the user.
        /// </summary>
        [Required]
        public string PasswordHash { get; set; }

        /// <summary>
        /// The email address of the user.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// The collection of contacts associated with the user.
        /// </summary>
        public ICollection<Contact> Contacts { get; set; } = new List<Contact>();

        /// <summary>
        /// The date and time the user was created.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// The date and time the user was last updated.
        /// </summary>
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
