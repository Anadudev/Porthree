import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from "@mui/material";

const UserProfileDisplay = ({ user }) => (
  <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            ['Username:', user.username || ''],
            ['First Name:', user.first_name || ''],
            ['Middle Name:', user.middle_name || 'No middle name set'],
            ['Last Name:', user.last_name || ''],
            ['Email:', user.email],
            ['Phone:', user.phone || ''],
            ['Career:', user.career || 'career not provided'],
            ['Bio:', user.bio || 'No bio provided'],
            ['About:', user.about || 'No about set'],
            ['Location:', user.location || 'No location provided'],
          ].map(([label, value], index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1">{label}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{value}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
  </>
);

export default UserProfileDisplay;
