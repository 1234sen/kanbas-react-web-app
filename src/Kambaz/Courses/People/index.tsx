import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as client from "../client";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function People() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { cid } = useParams();

    // Fetch course students data
    const fetchPeople = async () => {
        try {
            setLoading(true);
            if (cid) {
                const courseUsers = await client.findUsersForCourse(cid);
                setUsers(courseUsers);
            }
        } catch (error) {
            console.error("Failed to fetch course students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, [cid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Course Students</h3>
            <PeopleTable users={users} />
        </div>
    );
}