import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

interface UserSettingsPageProps { };

const UserSettingsPage: FunctionComponent<UserSettingsPageProps> = () => {

    const params = useParams<{ username: string; }>();

    return (
        <div>
            {params.username}

        </div>
    );
};

export default UserSettingsPage;
