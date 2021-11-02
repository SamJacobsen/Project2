export interface calendarTask{
    id?: string;
    user_id?: string;
    task_name?: string;
    description?: string;
    start_date: Date;
    end_date?: Date;
    status?: string;
}