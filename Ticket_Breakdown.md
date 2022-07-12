# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### **Migration script**

**Context**

In order to allow each facility to set a custom ID for each of their agents, and knowing that agents can work for multiple facilities. We have to introduce a new association table to allow for the new many-to-many relationship between the `Facilities` and `Agents` tables.

**Requirements**

- Create a new `customAgentIds` association table with 3 columns (facility id, agent id & custom agent id).

  > this new association table has a composite primary key (facility id & agent id).

- Write a migration script to seed data into the new table:
  - Select facility id & agent id from the shifts table and group them by facility id and agent id. This is essentially the content of the new `customAgentIds` association table you just have to add the custom agent id column.
  - the custom agent id value must be set to the agent id by default (internal database id & the agent's primary key).

### **Agents Entity & GET endpoint**

**Context**

In order to allow facilities to set a custom Id for each one of the agents they work with, this new property need to be added to the agents entity and it must be set at request-time depending on the facility that's requesting it.

> This property is optional and only relevant when the agent data is request by a facility.

**Requirements**

- A new `customId` property must be added to the Agent entity.
- Whenever the agents list is requests from a certain facility (a logged in facility admin), the custom agent id corressponding to that facility must be retrieved from the `customAgentIds` association table and appended to agent object.

### **Interface update**

**Context**

To support custom agent ids client side, facility admins must be able to view them and modify them from their dashboards.

**Reauirements**

- Display the new agent `customId` property in the agent info component.
- Allow editing the `customId` property in the agent info update form.

### **PDF generation**

**Context**

After adding support for facility unique custom agent IDs, the generated reports for each facility must use this new custom agent id instead of the agent's primary key (database generatd id).

**Reauirements**

- When generating a new report, Use the agent id & the facility id to retrieve the `customId` from the `customAgentIds` association table
- Display the `customId` instead of the `agentId` in the generated shift reports.
