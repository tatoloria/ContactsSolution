namespace ContactsApi.Models
{
    /// <summary>
    /// Represents a contact associated with a user.
    /// </summary>
    public class Contact
    {
        /// <summary>
        /// The unique identifier for the contact.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The name of the contact.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The phone number of the contact.
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// The foreign key linking the contact to a specific user.
        /// </summary>
        public Guid UserId { get; set; }
    }
}
