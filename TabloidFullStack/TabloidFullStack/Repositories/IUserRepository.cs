﻿using TabloidFullStack.Models;


namespace TabloidFullStack.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        //UserProfile GetAllProfiles();

        List<UserProfile> GetAllProfiles();

        List<UserProfile> GetByStatusId(int id);

        UserProfile GetById(int Id);
        void UpdateStatusId(UserProfile userProfile);

    }
}
