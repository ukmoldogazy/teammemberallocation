import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import NotFound from "./NotFound";
import Header from "./Header";
import Footer from "./Footer";
import GroupedTeamMembers from "./GroupedTeamMembers";
import Employees from "./Employees";

function App() {
  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "TeamB"
  );

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employeeList")) || [
      {
        id: 1,
        fullName: "Moldogazy Kabylbekov",
        designation: "JavaScript Developer",
        gender: "male",
        teamName: "GroupA",
      },
      {
        id: 2,
        fullName: "Bakai Akylbekov",
        designation: "VueJS Developer",
        gender: "male",
        teamName: "GroupA",
      },
      {
        id: 3,
        fullName: "Erbol Tukashov",
        designation: "ReactJS Developer",
        gender: "male",
        teamName: "GroupA",
      },
      {
        id: 4,
        fullName: "Nasyikat Mambetalieva",
        designation: "Web Desiner",
        gender: "female",
        teamName: "GroupB",
      },
      {
        id: 5,
        fullName: "Ainagul Shabdanova",
        designation: "SQL Developer",
        gender: "female",
        teamName: "GroupB",
      },
      {
        id: 6,
        fullName: "Myrzaiym Askarova",
        designation: "PHP Developer",
        gender: "female",
        teamName: "GroupB",
      },
      {
        id: 7,
        fullName: "Zhyldyzback Shatmanov",
        designation: "C# Developer",
        gender: "male",
        teamName: "GroupC",
      },
      {
        id: 8,
        fullName: "Peri Melisova",
        designation: "UX Desiner",
        gender: "feale",
        teamName: "GroupC",
      },
      {
        id: 9,
        fullName: "Max Asanbekov",
        designation: "SQL Developer",
        gender: "male",
        teamName: "GroupC",
      },
      {
        id: 10,
        fullName: "Mark Zuckerberg",
        designation: "Node Developer",
        gender: "male",
        teamName: "GroupD",
      },
      {
        id: 11,
        fullName: "Azamat Zhamankulov",
        designation: "Product Manager",
        gender: "male",
        teamName: "GroupD",
      },
      {
        id: 12,
        fullName: "Jalyn Kyrgyz uulu",
        designation: "Kotlin Developer",
        gender: "male",
        teamName: "GroupD",
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  function handleTeamSeclectionChange(e) {
    setTeam(e.target.value);
  }

  function handleEmployeeCardClick(e) {
    const transformedEmployees = employees.map((employee) =>
      employee.id === parseInt(e.currentTarget.id)
        ? employee.teamName === selectedTeam
          ? { ...employee, teamName: "" }
          : { ...employee, teamName: selectedTeam }
        : employee
    );

    setEmployees(transformedEmployees);
  }

  return (
    <Router>
      <Nav />
      <Header
        selectedTeam={selectedTeam}
        teamMemberCount={
          employees.filter((employee) => employee.teamName === selectedTeam)
            .length
        }
      />

      <Routes>
        <Route
          path="/"
          element={
            <Employees
              employees={employees}
              selectedTeam={selectedTeam}
              handleEmployeeCardClick={handleEmployeeCardClick}
              handleTeamSeclectionChange={handleTeamSeclectionChange}
            />
          }
        ></Route>
        <Route
          path="/GroupedTeamMembers"
          element={
            <GroupedTeamMembers
              employees={employees}
              selectedTeam={selectedTeam}
              setTeam={setTeam}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
