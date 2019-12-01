using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace MVC_CRUD_AJAX.Models
{
    public class EmployeeDB
    {
        string conString = ConfigurationManager.ConnectionStrings["TestDB_CS"].ToString();
        public List<Employee> SelectEmployee()
        {
            List<Employee> listEmp = new List<Employee>();
            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("SelectEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    listEmp.Add(new Employee{
                        EmployeeID = Convert.ToInt32(dr["EmployeeID"]),
                        Name = dr["Name"].ToString(),
                        Age = Convert.ToInt32(dr["Age"]),
                        State = dr["State"].ToString(),
                        Country = dr["Country"].ToString()
                    });
                }

                return listEmp;
            }
        }

        public int InsertEmployee(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("InsertEmployee",con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", emp.Name);
                cmd.Parameters.AddWithValue("@Age", emp.Age);
                cmd.Parameters.AddWithValue("@State", emp.State);
                cmd.Parameters.AddWithValue("@Country", emp.Country);

                i = cmd.ExecuteNonQuery();
            }

            return i;
        }

        public int UpdateEmployee(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UpdateEmployee",con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmployeeID", emp.EmployeeID);
                cmd.Parameters.AddWithValue("@Name", emp.Name);
                cmd.Parameters.AddWithValue("@Age", emp.Age);
                cmd.Parameters.AddWithValue("@State", emp.State);
                cmd.Parameters.AddWithValue("@Country", emp.Country);

                i = cmd.ExecuteNonQuery();
            }

            return i;
        }

        public int DeleteEmplyee(int empId)
        {
            int i;
            using(SqlConnection con = new SqlConnection(conString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("DeleteEmployee",con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmployeeID", empId);
                
                i = cmd.ExecuteNonQuery();                
            }

            return i;
        }
    }
}