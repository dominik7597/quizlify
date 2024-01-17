using System.Reflection;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizAPI.Migrations
{
    public partial class AddQuestionsToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [ImageName], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Który z poniższych nie jest jednym z głównych języków programowania używanych w technologii .NET?', 'Programming-Language-Popularity', 'C#', 'Java', 'VB.NET', 'F#', 2);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Co oznacza skrót MVC w kontekście wzorca projektowego w technologii .NET?', 'Model View Controller', 'Microsoft Visual Component', 'Master View Control', 'Model View Component', 1);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Jakie narzędzie jest używane do zarządzania zależnościami w projektach .NET?', 'NuGet', 'Git', 'Jenkins', 'Docker', 1);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Co to jest Entity Framework w kontekście .NET?', 'Framework do testowania jednostkowego', 'ORM (Object-Relational Mapping) do pracy z bazami danych', 'Biblioteka do tworzenia interfejsów użytkownika', 'Środowisko do tworzenia gier w .NET', 2);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Który wzorzec projektowy jest wykorzystywany do zarządzania dostępem do obiektów i unikania ich bezpośredniego tworzenia w .NET?', 'Singleton', 'Factory Method', 'Observer', 'Prototype', 2);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Co oznacza skrót ASP w kontekście technologii .NET?', 'Active Server Pages', 'Advanced Software Platform', 'Application Security Protocol', 'Agile Software Production', 1);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Jaka technologia .NET jest używana do tworzenia interfejsów użytkownika na różne platformy, w tym Windows, macOS i Linux?', 'Windows Forms', 'WPF (Windows Presentation Foundation)', 'ASP.NET', 'Xamarin', 4);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Który wzorzec projektowy jest używany do zarządzania sesją użytkownika w aplikacjach internetowych w .NET?', 'MVC (Model-View-Controller)', 'Singleton', 'Session Facade', 'Factory Method', 3);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Który język programowania jest najczęściej używany w technologii .NET Core?', 'C#', 'Java', 'Python', 'Ruby', 1);
                ");

            migrationBuilder.Sql(
                @"
                INSERT INTO [Questions] ([QuestionInWords], [Option1], [Option2], [Option3], [Option4], [Answer])
                VALUES ('Co to jest .NET Core?', 'Zbiór narzędzi do tworzenia aplikacji biurowych', 'Nowa wersja systemu operacyjnego od Microsoft', 'Otwarty i wieloplatformowy framework .NET', 'Pakiet do tworzenia stron internetowych', 3);
                ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Co oznacza skrót MVC w kontekście wzorca projektowego w technologii .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Który z poniższych nie jest jednym z głównych języków programowania używanych w technologii .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Jakie narzędzie jest używane do zarządzania zależnościami w projektach .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Co to jest Entity Framework w kontekście .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Który wzorzec projektowy jest wykorzystywany do zarządzania dostępem do obiektów i unikania ich bezpośredniego tworzenia w .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Co oznacza skrót ASP w kontekście technologii .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Jaka technologia .NET jest używana do tworzenia interfejsów użytkownika na różne platformy, w tym Windows, macOS i Linux?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Który wzorzec projektowy jest używany do zarządzania sesją użytkownika w aplikacjach internetowych w .NET?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Który język programowania jest najczęściej używany w technologii .NET Core?'");
            migrationBuilder.Sql("DELETE FROM [Questions] WHERE [QuestionInWords] = 'Co to jest .NET Core?'");
        }
    }
}
