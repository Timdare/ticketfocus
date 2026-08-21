import dayjs from "dayjs";
import { useEffect } from "react";
import { TasksProgressContainer } from "../components/TasksProgressContainer";
import { InputContainer } from "../components/InputContainer";
import { ItemContainer } from "../components/ItemContainer";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";

export function PrevTicketPage({ 
    users, 
    setUsers, 
    ongoingSess,
    input,
    setInput,
    officeSelected,
    setOfficeSelected,
    displayInputContainer,
    setDisplayInputContainer,
    page,
    setPage,
    updateInputs,
    isEditingTicket,
    setIsEditingTicket,
    ticketToEdit,
    setTicketToEdit,
}) {
    
    const user = users.find((u) => u.userId === ongoingSess.userId);

    useEffect(()=> {
        setPage("prev-tickets");
        setDisplayInputContainer(false);
    }, [page])

    const testDate = "2026-08-16";
    
    return (
        <>
            <title>TicketFocus - Prev. Tickets</title>

            <div className="main-content">
                <header>
                  <h1 className="project-name dark-blue">TicketFocus</h1>
                </header>

                <main>
                    <section className="task-details-container">
                        <TasksProgressContainer
                            // tasks={tasks}
                            user={user ? user : ""}
                            todaysDate={""}
                        />
                    </section>

                    <section className="task-list-container p-inline-1rem white-bg rounded-8px">
                        <div className="list-container p-block-1rem">
                            {displayInputContainer &&
                                <InputContainer
                                    input={input}
                                    setInput={setInput}
                                    officeSelected={officeSelected}
                                    setOfficeSelected={setOfficeSelected}
                                    user={user ? user : ""}
                                    setUsers={setUsers}
                                    page={"prev-tickets"}
                                    isEditingTicket={isEditingTicket}
                                    setIsEditingTicket={setIsEditingTicket}
                                    ticketToEdit={ticketToEdit}
                                    setTicketToEdit={setTicketToEdit}
                                    setDisplayInputContainer={setDisplayInputContainer}
                                />
                            }
                        </div>

                        <ul className="task-list">
                            {user.tasks &&
                                user.tasks.map(task => {
                                    const formattedTaskDate = dayjs(task.createdAt).format("YYYY-MM-DD")
                                    console.log(formattedTaskDate)
                                    return (
                                        formattedTaskDate === testDate && <ItemContainer
                                            task={task}
                                            key={task.id}
                                            // setTasks={setTasks}
                                            updateInputs={updateInputs}
                                            user={user}
                                            setUsers={setUsers}
                                            setDisplayInputContainer={setDisplayInputContainer}
                                            setIsEditingTicket={setIsEditingTicket}
                                            setTicketToEdit={setTicketToEdit}
                                        />
                                    );
                                })

                            }
                        </ul>

                    </section>

          <LogoutBtnContainer />

                </main>    
                



            </div>
            <h1>Tracking Page</h1>
        </>
    );

}