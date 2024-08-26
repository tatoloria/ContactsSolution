namespace ContactsApi.Models.Requests
{
    /// <summary>
    /// Represents a request to log in a user.
    /// </summary>
    public class LoginRequest
    {
        /// <summary>
        /// The username of the user attempting to log in.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// The password of the user attempting to log in.
        /// </summary>
        public string Password { get; set; }
    }
}
