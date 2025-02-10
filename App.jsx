import React, { useState } from "react";

const routine = {
  "Lunes": {
    calentamiento: { tiempo: "10 minutos" },
    ejercicios: [
      { name: "Prensa de piernas", link: "https://www.youtube.com/watch?v=IZxyjW7MPJQ", description: "4 series de 12 repeticiones" },
      { name: "Extensión de cuádriceps", link: "https://www.youtube.com/watch?v=ljOckPd9NMI", description: "3 series de 15 repeticiones" },
    ],
    estiramiento: { tiempo: "10 minutos" },
  },
  "Martes": {
    calentamiento: { tiempo: "10 minutos" },
    ejercicios: [
      { name: "Press de pecho en máquina", link: "https://www.youtube.com/watch?v=6Wsm2iD_kPM", description: "4 series de 10 repeticiones" },
      { name: "Remo en máquina", link: "https://www.youtube.com/watch?v=r9iXA4bE6Is", description: "3 series de 12 repeticiones" },
    ],
    estiramiento: { tiempo: "10 minutos" },
  }
};

export default function GymRoutineTracker() {
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [completed, setCompleted] = useState({});

  const toggleComplete = (day, type, index = null) => {
    setCompleted((prev) => {
      const updatedDay = prev[day] ? { ...prev[day] } : { ejercicios: {} };
      if (index !== null) {
        updatedDay.ejercicios[index] = !updatedDay.ejercicios[index];
      } else {
        updatedDay[type] = !updatedDay[type];
      }
      return { ...prev, [day]: updatedDay };
    });
  };

  const resetDay = (day) => {
    setCompleted((prev) => ({ ...prev, [day]: { ejercicios: {} } }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {Object.keys(routine).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              margin: "5px",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: selectedDay === day ? "#007BFF" : "#E0E0E0",
              color: selectedDay === day ? "white" : "black",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {day}
          </button>
        ))}
      </div>
      <h1 style={{ textAlign: "center", color: "#007BFF" }}>{selectedDay}</h1>
      <button onClick={() => resetDay(selectedDay)} style={{ display: "block", margin: "10px auto", padding: "10px", backgroundColor: "#FF5733", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Reiniciar
      </button>
      {["calentamiento", "ejercicios", "estiramiento"].map((section) => (
        <div key={section} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h2 style={{ color: "#333", fontWeight: "bold", textTransform: "uppercase" }}>{section}</h2>
          {section === "ejercicios" ? (
            routine[selectedDay][section].map((exercise, index) => (
              <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fff" }}>
                <button
                  onClick={() => toggleComplete(selectedDay, section, index)}
                  style={{
                    backgroundColor: completed[selectedDay]?.ejercicios?.[index] ? "#4CAF50" : "#E0E0E0",
                    padding: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {exercise.name}
                </button>
                <p style={{ fontSize: "12px", color: "#666" }}>{exercise.description}</p>
                <a href={exercise.link} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "5px" }}>Ver Video</a>
              </div>
            ))
          ) : (
            <>
              <p style={{ fontSize: "14px" }}>Tiempo: {routine[selectedDay][section].tiempo}</p>
              <button
                onClick={() => toggleComplete(selectedDay, section)}
                style={{ backgroundColor: completed[selectedDay]?.[section] ? "#4CAF50" : "#E0E0E0", padding: "5px" }}
              >
                {completed[selectedDay]?.[section] ? "Completado" : "Completar"}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
