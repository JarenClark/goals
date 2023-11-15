
## Project Setup
1. NextJS Initiation  
2. NextJS connect to Supabase
3. Code Lint Code Format
4. Setup UI Lib
5. Setup State Managment
6. Moudle design
## Database
- User, Role
- Group/Department
- Deliverables Category
- Document
- Content
- Revision
## User Authorization
1.  Google Auth0
	1. Login UI,  Google auth with Supabase
	2. Authorization exceptions
2.  User info fetch (TN CRM)

## User Permission
1. Permissions：ReadOnly、General User、Admin
2. Permisson Admin UI
3. Grant user persmission upon Google login?
4. Grant permissions by department (how to fetch department data? through CRM?)

## Contract/Document List
1. Listing
	1. Master Templates on the top
	2. 20 items per page with pagination
	3. Document Name、Creation time、author、stauts、functional buttons
	4. Document count number
	5. Filter by status（Approved、Sent to client、Rejected、Revised、Action Needed）
	6. Search by sow name or client name
	7. Filter by status and the search above
	8. Warning icon if contact is due
2. Quick create document
	1. Enter Company name、type（AOR、Custom）and Year
	2. Enter custom type when choose custom
	3. Client name、type、contracy years are mandatory
	4. Contract title is composed of SOW number, client, type, year:  10663_test2_website_2024

## Document Content
### Tool Bar
1. Undo Redo using state management
2. Show status on left
3. Title in the middle
4. PDF View、Reorder、Settings、Save Icons on right
	1. PDF View Page
	2. Reorder content index
	3. Content settings popup from right side
	4. Saving
### PDF View
1. PDF View page
2. Print button

### Settings
1. Details and Revisions Tabs
2. Clone、New Version、Reject buttons
	1. Clone to create a new document
	2. New Version to create a new revision
	3. Reject to set document to be Rejected 
	4. UnReject to unset Reject
4. Creator、avatar、creation time at bottom
5. Form fileds:
	1. Company Name 
	2. Contract Type（AOR、Custom）
	3. Custom Type （ Custom）
	4. SOW Type  Default: Strategic Plan
		1. Strategic Plan
		2. Order Form
		3. Research Report
		4. Exhibit/Event Proposal
		5. Gift Estimate
		6. Statement of Work
		7. Proposal
	5. Contract Year 2020-2024
	6. Currency default: USD
		1. USD($)
		2. EUR(€)
		3. GBP(£)
	7. SOW Date default: current time
	8. Signature Date default: current time
	9. Address defaulf:  New York 
		1. New York 
		2. Paris
	10. Sales Person: multi-select sales person 
	11. Account Management: multi-select account manager
	12. Internal Logo:  choose one of two logos
	13. <span style="color:red">How to extend the contract? with what permisson?</span>
#### Revisions Tab
1. Revision number，time、creator、status
2. Click revision to switch
	1. to show Document content
	2. Revert, Cancel buttons
	3. Cancel

### Deliverables
1. Create multiple tables
2. Modify table title
3. Aggregated bt group merged cells
4. Each specified deliverables type
5. Calculation：
	1. DirectSpend = DirectSpend
	2. ExistingSpend = ExistingSpend
	3. PassThrough = PassThrough 
	4. Sub Total = Existing Spend (<span style="color:red">Not using?</span>)+ Pass Through + Direct Spend - Discount
	5. Section Total = Pass Through + Direct Spend
	6. SOW Total = Section Total - Discount (final）
6. Add Deliverables：
		dropdown list of category
		Section Title
		Add subsections (tick Deliverables)
	  Rich text input

### Payment Schedule
1. Default : one year from start date
2. Payment schedule needs to be divisible by number of month
3. Payment amount：Total / number of payment
4. First payment amount：（Total / number of payment）+ remainder 
5. Due on approve

### Team & Approve
1. Department list and members
2. Multi-select member
3. upload files
4. Not to upload file
5. SOW date

### Index of Contents
1. list out links of documents
2. sync up the content presentation when click on index

### Add Section
1. add section button
2. title、if it is a appendixor Deliverable、if start from new page
3. rich text
4. import Section
	1. Search by SOW name  and Section name
	2. import the search result into the section popup

## Document Status
- Approved document is readonly
- 
## Common Toolbar
1. Buttons: home、reporting、recent views, Avatar at the right end
2. admin button
3. back to home
4. reporting button
5. List out recent viewed of 10 docuemtns
	1. click to open up the document
	2. if no records, show: "You haven't viewed any SOWs yet"
6. click avatar to logout









